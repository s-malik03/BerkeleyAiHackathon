import { React, useState, useEffect } from 'react';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export const audioInstance = async (oldText, newText) => {
    // this.totalText = '';
    // this.curMap = [];

    // chat instance
    const chat = new ChatOpenAI({
        temperature: 0.8,
        model: "gpt-3.5-turbo",
        openAIApiKey: process.env.OPENAI_API_KEY
    });

    // create a map parser based on output requirements
    const mapSchema = z.object({
        nodes : z.array(z.object({
            entity: z.string(),
            description: z.string()
        })),
        links: z.array(z.object({
            source : z.string(),
            target : z.string()
        }))
    });
    const mapParser = StructuredOutputParser.fromZodSchema(mapSchema);

    // chain purpose: convert the text into nodes/sources and create a hashmap
    const chain_one = ChatPromptTemplate.fromTemplate(
        "{system_prompt}. \n {format_instructions} \n text : {text_to_parse}"
    ).pipe(chat).pipe(mapParser);

    const response = await chain_one.invoke({
        system_prompt: "system_prompt",
        format_instructions: mapParser.getFormatInstructions(),
        text_to_parse: newText
    })

    return response, oldText + "\n" + newText;
}
