import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export class ESMTab extends PluginSettingTab {
	constructor(app: App, public plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl, plugin } = this;
		const { settings } = plugin

		containerEl.empty();

		new Setting(containerEl)
			.setName('Enable ribbon icon')
			.addToggle((cb) => {
				cb.setValue(this.plugin.settings.enableRibbonIcon)
				cb.onChange(async (value) => {
					this.plugin.settings.enableRibbonIcon = value;
					if (this.plugin.settings.enableRibbonIcon) {
						this.plugin.ribbonIconHandler()// add ribbon
					}
					else {
						this.plugin.ribbonIconEl?.remove();//del ribbon
						this.plugin.ribbonIconEl = null;
					}
					await this.plugin.saveSettings();
				})
			})

		new Setting(containerEl)
			.addTextArea((area) => {
				area.inputEl.setAttr('rows', 30)
				area.inputEl.style.width = '90%';
				const emojiValues = settings.myEmojis.map(item => `${item.emoji} ${item.desc}`);				
				area.setValue(emojiValues.join('\n'));
				area.inputEl.onblur = async () => {
					const inputText = area.inputEl.value;
					const myEmojis = this.processEmojisList(inputText);
					settings.myEmojis = myEmojis
					await this.plugin.saveSettings()
				};
			})
			.setName("emoji list")
			.setDesc('add 1 "emoji description" by line')
	}

	processEmojisList(inputText: string) {
		const lines = inputText.split("\n");
		const myEmojis = [];
		for (const line of lines) {
			const trimmedLine = line.trim();
			if (trimmedLine !== '') {
				const spaceIndex = trimmedLine.indexOf(' ');
				const emoji = spaceIndex !== -1 ? trimmedLine.substring(0, spaceIndex) : trimmedLine;
				const desc = spaceIndex !== -1 ? trimmedLine.substring(spaceIndex + 1) : '';

				const emojiItem = {
					emoji: emoji,
					desc: desc.trim()
				};

				myEmojis.push(emojiItem);
			}
		}
		return myEmojis;
	}
}
