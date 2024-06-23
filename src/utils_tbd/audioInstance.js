import { useState, useEffect } from 'react';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { defaultErrorMap, z } from "zod";

export const audioInstance = () => {
    const [totalText, setTotalText] = useState('');
    const [curMap, setCurMap] = useState([]);

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

    const system_prompt = `
        Generate a D3 hashmap from the following text. Each node should represent a core idea, with the id being the core idea and the description being a summary of that idea. Create links between nodes to show connections between ideas.

        Template:

        {
          "nodes": [
            { "entity": "Core Idea 1", "description": "Summary of Core Idea 1" },
            { "entity": "Core Idea 2", "description": "Summary of Core Idea 2" },
            ...
          ],
          "links": [
            { "source": "Core Idea 1", "target": "Core Idea 2" },
            { "source": "Core Idea 2", "target": "Core Idea 3" },
            ...
          ]
        }

        Text:

        ${text}
            `;

    const updateMap = async (newText) => {
        // append the new text to the total text
        setTotalText(prevText => prevText + newText);

        // invoke the chain
        const response = await chain_one.invoke({
            system_prompt: system_prompt,
            format_instructions: mapParser.getFormatInstructions(),
            text_to_parse: totalText
        })
        return response
    }
}
