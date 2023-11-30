interface emojiItem {
    emoji: string;
    desc: string
}


export interface ESMSettings {
    enableRibbonIcon: boolean;
    myEmojis: emojiItem[];
}

export const DEFAULT_SETTINGS: ESMSettings = {
    enableRibbonIcon:true,
    myEmojis: [
        {
            emoji: "✍️",
            desc: "Todo"
        },
        {
            emoji: "✔️",
            desc: "Completed"
        },
        {
            emoji: "🚥",
            desc: "In progress"
        },
        {
            emoji: "🚦",
            desc: "Pending"
        },
        {
            emoji: "🔜",
            desc: "Upcoming"
        },
        {
            emoji: "➡️",
            desc: "Next step"
        },
        {
            emoji: "📅",
            desc: "Scheduled"
        },
        {
            emoji: "👍",
            desc: "OK"
        },
        {
            emoji: "🚀",
            desc: "Good to Go"
        },
        {
            emoji: "💖",
            desc: "Super OK"
        },
        {
            emoji: "👀",
            desc: "To see"
        },
        {
            emoji: "💡",
            desc: "Idea"
        },
        {
            emoji: "🎨",
            desc: "Creative task"
        },
        {
            emoji: "🛠️",
            desc: "Maintenance"
        },
        {
            emoji: "🎯",
            desc: "Objective"
        },
        {
            emoji: "❗",
            desc: "Important"
        },
        {
            emoji: "🔧",
            desc: "Tools"
        },
        {
            emoji: "⚙️",
            desc: "Option/Param"
        }
    ]
};