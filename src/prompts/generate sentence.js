const old_graph_prompt = 'Given the following graph data, describe each edge with a sentence. The ordinal number in the label of each edge indicates the order of the things happened.' +
    'For example. [{"fromId":1,"ToId":2,"label":"in"},{"fromId":3,"ToId":4,"label":"go travel"},{"fromId":4,"ToId":1,"label":"1. live in"},{"fromId":3,"ToId":1,"label":"1. live in "},{"fromId":3,"ToId":1,"label":"2. has nightmare"}] [{"id":1,"label":"hotel"},{"id":2,"label":"Boston"},{"id":3,"label":"Alice"},{"id":4,"label":"Bob"}]' +
    'The answer is: There is a hotel in Boston. Alice and Bob go travel. Bob lives in hotel. Alice lives in hotel. Then, Alice has nightmare in hotel.' +
    'Let me explain to you. Each sentence describes an edge clearly and orderly. And given the label "1. live in"  and  "2. has nightmare", we can know "Alice lives in hotel." happens first and "Alice has nightmare in hotel." happens later.' +
    'Give me your answer directly according to the order of edges I give you without any explanation. The data you need process is:'

const graph_prompt = 'Given the following graph data, describe each edge with a sentence. The ordinal number in the label of each edge indicates the order of the things happened.' +
    'For example. {"fromId":1,"ToId":2,"label":"in"} [{"id":1,"label":"hotel"},{"id":2,"label":"Boston"},{"id":3,"label":"Alice"},{"id":4,"label":"Bob"}]' +
    'The answer is: There is a hotel in Boston. ' +
    'Give me your answer directly according to the order of edges I give you without any explanation. The data you need process is:'

//                 "prompt": "" + "edges: " + JSON.stringify(edges) + 'nodes: '+ JSON.stringify(nodes),

// function generate_sentences({characters, actions, scenes}){
//     let characterString = 'Character: '
//     for(const character of characters){
//         characterString+=character+', '
//     }
//     characterString = characterString.substring(0, characterString.length-2) + '. '
//     let actionString = 'Action: '
//     for(const action of actions){
//         actionString+=action+', '
//     }
//     actionString = actionString.substring(0, actionString.length-2) + '. '
//     let sceneString = 'Scene: '
//     for(const scene of scenes){
//         sceneString+=scene+', '
//     }
//     sceneString = sceneString.substring(0, sceneString.length-2) + '. '
//     const prompts = prompts_header + 'Question: ' + characterString + actionString + sceneString + 'Answer: '
//     // 给backend or chatgpt发送请求
// }


const scene_prompt = 'Remove names (characters) of these sentences! Then abstract specific scenes. Finally, connect them into sentences.' +
    'Example 1: This morning I had breakfast with my dad in the kitchen, with sunbeams streaming through the large windows. I was excited that I can finally go to the art museum with my friends Alice and Bella. Answer: This morning, breakfast in the kitchen, with sunbeams streaming through the large windows. The art museum.'+
    'Given example 1, you first need remove I, my dad, Alice, and Bella from this sentence. Then abstract specific scenes, like kitchen with sunbeams streaming through the large windows, art museum. Finally, you need connect scenes together. A kitchen with sunbeams streaming through the large windows and an art museum.'+
    'Example 2: Suddenly, it started raining outside. I went to the old train station nearby to wait for the train to go to the museum. Answer: Raining outside. The old train station. The train to go to the museum.' +
    'Example 3: I was all wet when I arrived, but I didn’t care because I saw Alice and Bella waiting for me in the spacious halls of the art museum, with exquisite European oil paintings in golden ornate frames on the walls. Answer: The spacious halls of the art museum, with exquisite European oil paintings in golden ornate frames on the walls.'+
    'Example 4: I forgot all about the weather, and we spent a lovely afternoon immersing in the beautiful paintings. Answer: The weather. A lovely afternoon immersing in the beautiful paintings.' +
    'Example 5: Bob and Alice date with each other, then they watch movie together, then they have dinner together. Bob is in hotel, and hotel is at Boston. Answer: Hotel is at Boston.' +
    'You should only return final sentence without any character, which means you must just return a sentence like: "A kitchen with sunbeams streaming through the large windows and an art museum.". The sentence you need to process is: '


export {scene_prompt, graph_prompt}