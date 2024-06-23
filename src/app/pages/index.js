import D3Graph from '../components/D3Graph';

const graph = {
  "nodes": [
    {"id": "Commencement Address", "description": "The occasion and context of the speech."},
    {"id": "Three Stories", "description": "The structure of the speech."},
    {"id": "Connecting the Dots", "description": "The first story about connecting the dots."},
    {"id": "Dropping Out", "description": "Dropped out of Reed College."},
    {"id": "Adoption Story", "description": "Background of his adoption."},
    {"id": "Calligraphy Class", "description": "Learned calligraphy."},
    {"id": "Macintosh Typography", "description": "Applied calligraphy knowledge to Macintosh."},
    {"id": "Love and Loss", "description": "The second story about love and loss."},
    {"id": "Found Apple", "description": "Started Apple."},
    {"id": "Fired from Apple", "description": "Got fired from his own company."},
    {"id": "Starting Over", "description": "Founded NeXT and Pixar."},
    {"id": "Return to Apple", "description": "Returned to Apple after NeXT acquisition."},
    {"id": "Death", "description": "The third story about death."},
    {"id": "Cancer Diagnosis", "description": "Diagnosis and surgery."},
    {"id": "Facing Mortality", "description": "Reflections on death."},
    {"id": "Follow Your Heart", "description": "Advice to follow one's intuition."},
    {"id": "Stay Hungry, Stay Foolish", "description": "The concluding message."}
  ],
  "links": [
    {"source": "Commencement Address", "target": "Three Stories"},
    {"source": "Three Stories", "target": "Connecting the Dots"},
    {"source": "Three Stories", "target": "Love and Loss"},
    {"source": "Three Stories", "target": "Death"},
    {"source": "Connecting the Dots", "target": "Dropping Out"},
    {"source": "Connecting the Dots", "target": "Adoption Story"},
    {"source": "Connecting the Dots", "target": "Calligraphy Class"},
    {"source": "Connecting the Dots", "target": "Macintosh Typography"},
    {"source": "Love and Loss", "target": "Found Apple"},
    {"source": "Love and Loss", "target": "Fired from Apple"},
    {"source": "Love and Loss", "target": "Starting Over"},
    {"source": "Love and Loss", "target": "Return to Apple"},
    {"source": "Death", "target": "Cancer Diagnosis"},
    {"source": "Death", "target": "Facing Mortality"},
    {"source": "Death", "target": "Follow Your Heart"},
    {"source": "Commencement Address", "target": "Stay Hungry, Stay Foolish"}
  ]
};

export default function Home() {
  return (
    <div>
      <h1>D3 Graph</h1>
      <D3Graph graph={graph} />
    </div>
  );
}
