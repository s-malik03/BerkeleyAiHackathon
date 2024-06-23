"use client";

import React from 'react';

const Transcript = ({ sentences, currentIndex }) => {
    return (
        <div className="transcript">
            <h2>Transcript</h2>
            <ul>
                {sentences.slice(0, currentIndex + 1).map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                ))}
            </ul>
            <style jsx>{`
                .transcript {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin-left: 20px;
                    max-width: 400px;
                    max-height: 600px;
                    overflow-y: auto;
                }
                h2 {
                    margin-top: 0;
                }
                ul {
                    padding-left: 20px;
                }
            `}</style>
        </div>
    );
};

export default Transcript;
