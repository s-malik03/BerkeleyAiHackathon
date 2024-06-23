"use client";

import React, { useState, useEffect } from 'react';
import D3Graph from './components/D3Graph';
import Transcript from './components/Transcript';

const graphData = [
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." }
    ],
    links: []
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" }
    ]
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." },
      { id: "Wave-Particle Duality", description: "One of the most intriguing concepts in quantum physics is wave-particle duality." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" },
      { source: "Fundamental Nature", target: "Wave-Particle Duality" }
    ]
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." },
      { id: "Wave-Particle Duality", description: "One of the most intriguing concepts in quantum physics is wave-particle duality." },
      { id: "Observation", description: "Particles can exhibit both wave-like and particle-like properties depending on how they are observed." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" },
      { source: "Fundamental Nature", target: "Wave-Particle Duality" },
      { source: "Wave-Particle Duality", target: "Observation" }
    ]
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." },
      { id: "Wave-Particle Duality", description: "One of the most intriguing concepts in quantum physics is wave-particle duality." },
      { id: "Observation", description: "Particles can exhibit both wave-like and particle-like properties depending on how they are observed." },
      { id: "Superposition", description: "Another key principle is superposition, where particles can exist in multiple states simultaneously." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" },
      { source: "Fundamental Nature", target: "Wave-Particle Duality" },
      { source: "Wave-Particle Duality", target: "Observation" },
      { source: "Observation", target: "Superposition" }
    ]
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." },
      { id: "Wave-Particle Duality", description: "One of the most intriguing concepts in quantum physics is wave-particle duality." },
      { id: "Observation", description: "Particles can exhibit both wave-like and particle-like properties depending on how they are observed." },
      { id: "Superposition", description: "Another key principle is superposition, where particles can exist in multiple states simultaneously." },
      { id: "Entanglement", description: "Quantum entanglement describes a phenomenon where particles become interconnected and instantly affect each other regardless of distance." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" },
      { source: "Fundamental Nature", target: "Wave-Particle Duality" },
      { source: "Wave-Particle Duality", target: "Observation" },
      { source: "Observation", target: "Superposition" },
      { source: "Superposition", target: "Entanglement" }
    ]
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." },
      { id: "Wave-Particle Duality", description: "One of the most intriguing concepts in quantum physics is wave-particle duality." },
      { id: "Observation", description: "Particles can exhibit both wave-like and particle-like properties depending on how they are observed." },
      { id: "Superposition", description: "Another key principle is superposition, where particles can exist in multiple states simultaneously." },
      { id: "Entanglement", description: "Quantum entanglement describes a phenomenon where particles become interconnected and instantly affect each other regardless of distance." },
      { id: "Uncertainty Principle", description: "The uncertainty principle, introduced by Heisenberg, states that we cannot simultaneously know the exact position and momentum of a particle." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" },
      { source: "Fundamental Nature", target: "Wave-Particle Duality" },
      { source: "Wave-Particle Duality", target: "Observation" },
      { source: "Observation", target: "Superposition" },
      { source: "Superposition", target: "Entanglement" },
      { source: "Entanglement", target: "Uncertainty Principle" }
    ]
  },
  {
    nodes: [
      { id: "Quantum Physics", description: "Quantum physics is the study of the behavior of matter and energy at the smallest scales." },
      { id: "Fundamental Nature", description: "It reveals the fundamental nature of particles and the forces that govern them." },
      { id: "Wave-Particle Duality", description: "One of the most intriguing concepts in quantum physics is wave-particle duality." },
      { id: "Observation", description: "Particles can exhibit both wave-like and particle-like properties depending on how they are observed." },
      { id: "Superposition", description: "Another key principle is superposition, where particles can exist in multiple states simultaneously." },
      { id: "Entanglement", description: "Quantum entanglement describes a phenomenon where particles become interconnected and instantly affect each other regardless of distance." },
      { id: "Uncertainty Principle", description: "The uncertainty principle, introduced by Heisenberg, states that we cannot simultaneously know the exact position and momentum of a particle." },
      { id: "Technological Advancements", description: "Quantum physics has led to the development of various technologies, including semiconductors and quantum computing." }
    ],
    links: [
      { source: "Quantum Physics", target: "Fundamental Nature" },
      { source: "Fundamental Nature", target: "Wave-Particle Duality" },
      { source: "Wave-Particle Duality", target: "Observation" },
      { source: "Observation", target: "Superposition" },
      { source: "Superposition", target: "Entanglement" },
      { source: "Entanglement", target: "Uncertainty Principle" },
      { source: "Uncertainty Principle", target: "Technological Advancements" }
    ]
  }
];

const sentences = [
  "Quantum physics is the study of the behavior of matter and energy at the smallest scales.",
  "It reveals the fundamental nature of particles and the forces that govern them.",
  "One of the most intriguing concepts in quantum physics is wave-particle duality.",
  "Particles can exhibit both wave-like and particle-like properties depending on how they are observed.",
  "Another key principle is superposition, where particles can exist in multiple states simultaneously.",
  "Quantum entanglement describes a phenomenon where particles become interconnected and instantly affect each other regardless of distance.",
  "The uncertainty principle, introduced by Heisenberg, states that we cannot simultaneously know the exact position and momentum of a particle.",
  "Quantum physics has led to the development of various technologies, including semiconductors and quantum computing."
];

export default function Home() {
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGraphIndex((prevIndex) => {
        if (prevIndex < graphData.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <h1>D3 Graph</h1>
        <D3Graph graph={graphData[currentGraphIndex]} />
      </div>
      <Transcript sentences={sentences} currentIndex={currentGraphIndex} />
    </div>
  );
}
