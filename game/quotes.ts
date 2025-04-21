const genericQuotes = [
    [ "Regrets are pointless: either you are saved, in which case you should regret nothing; or you are lost, in which case you will soon burn." ],
    [ "Questions are for the weak-minded.", "-- World Eaters joke which was later adopted as a motto" ],
    [ "When all around you are losing their heads, duck. Then return fire.", 
        "-- Attributed to Field Marshal Conti of the Saturnine Rams"],
    [ "When the god machines shake the earth you may be afraid, but remember this: even the largest avalanche is triggered by a single snowflake."],
    [ "In the heat of the battle it can be hard to believe in the greatness of humanity. No matter: the gun in your hands holds humanity’s greatness, ready to be dispensed. It will believe for you." ],
    [ "Even a stopped clock can tell the right time when the bombs fall: it is time to fight." ],
    [ "Morality has failed us. Technology wil not.", 
        "-- Archmagos Lex Froal" ],
    [ "Critical thought is the enemy of progress.", "-- Mechanicum catechism" ],
    [ "For all of our history there has only ever been one way out of the darkness: flames." ],
    [ "Treat heretics like you would treat books: burn them while praising the Emperor!" ],
    [ "Fear is a tool like a knife: if you overuse it, it blunts. But there is no point in having a knife if you do not cut things from time to time.", 
        "-- Marius Vairosean, Captain in the IIIrd" ],
    [ "They believe in their false gods. They believe in a redemption which none of us have seen. They believe in an endless night, and a burning galaxy, and giving up on what we’ve achieved.", 
        "As for me… I believe in plasma. Let’s see which one appears when we start firing.", 
        "-- Sergeant Kellith Tannar of the Salamanders before the fall of Lanslan 5" ],
    [ "Ask not what is the price of victory. Instead, ask what the cost of defeat could be." ],
    [ "Life is short. Measure its value in the count of your enemy’s corpses." ],
    [ "The best logical argument is overwhelming force." ],
    [ "Peace is a lie." ]
]

export function quote(): string[] {
    const indx = Math.floor(Math.random() * genericQuotes.length);
    const out = genericQuotes[indx];
    return out
}