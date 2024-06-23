import 'dotenv/config';
import { React, useState, useEffect } from 'react';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
require('dotenv').config({
    debug: true
});


const audioInstance = async (corpus, graph) => {

    function dictToString(dict) {
        if (typeof dict !== 'object' || !dict.nodes || !dict.links) {
            throw new Error("Invalid input format");
        }
    
        // Initialize result string
        let result = "Nodes: ";
    
        // Process nodes
        dict.nodes.forEach(node => {
            result += `(Entity: ${node.entity}, Description: ${node.description}), `;
        });
    
        result += "Links: ";
    
        // Process links
        dict.links.forEach(link => {
            result += `(Source: ${link.source}, Target: ${link.target}), `;
        });   
        return result;
    }

    // console.log("env: " + process.env.NEXT_PUBLIC_OPENAI_API_KEY)

    // chat instance
    const chat = new ChatOpenAI({
        temperature: 0.9,
        model: "gpt-4o",
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY + ""
    });

    // create a map parser based on output requirements
    const mapSchema = z.object({
        nodes : z.array(z.object({
            entity: z.string(),
            description: z.string()
        })),
        links: z.array(z.object({
            source : z.string(),
            target : z.string(),
            description: z.string()
        }))
    });
    const mapParser = StructuredOutputParser.fromZodSchema(mapSchema);

    // chain purpose: convert the text into nodes/sources and create a hashmap
    const chain_one = ChatPromptTemplate.fromTemplate(
        '{system_prompt}. {format_instructions} \n context : {graph_context}  \n text : {text_to_parse}'
    ).pipe(chat).pipe(mapParser);

    console.log("corpus: " + corpus)

    const sys_prmpt = `You are a lecturer on the topic in the text. I need you to analyze the following text and generate a list of connections 
    between nodes that represent ideas. Each node should represent an idea or concept. Nodes should be 
    connected if there is a relevant relationship or connection between them. Try your best to not 
    change or remove old nodes UNLESS they are now irrelevant to the overarching theme and only add new nodes RELATED to the larger theme of the text and context.
    Keep more focus on better link and node descriptions than quantity of ideas.`

    try {
        const response = await chain_one.invoke({
            system_prompt: sys_prmpt ,
            format_instructions: mapParser.getFormatInstructions(),
            text_to_parse: corpus,
            graph_context: dictToString(graph)
        })
        // check if all links are valid nodes
        const nodes = response.nodes.map(node => node.entity);
        const links = response.links.map(link => [link.source, link.target]).flat();
        const invalidLinks = links.filter(link => !nodes.includes(link));
        if (invalidLinks.length > 0) {
            // remove from links
            response.links = response.links.filter(link => !invalidLinks.includes(link.source) && !invalidLinks.includes(link.target));
        }

        return response;
    } catch (error) {
        return graph
    }
}

export default audioInstance;