import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, ESMSettings } from "./types";
import { EmojiSelModal } from "./modal";
import { ESMTab } from "./settings";

export default class EmojiSelMenu extends Plugin {
	settings: ESMSettings;
	ribbonIconEl: HTMLElement|null

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ESMTab(this.app, this));
		this.addCommand({
			id: "emoji-selection-menu",
			name: "Emoji selection menu",
			icon: "smile-plus",
			editorCallback: (editor) => {
				new EmojiSelModal(this.app, this).open();
			},
		});

		this.ribbonIconHandler()

	}

	ribbonIconHandler() {
		this.ribbonIconEl = this.addRibbonIcon('smile-plus', 'Open emoji menu', (evt: MouseEvent) => {
			new EmojiSelModal(this.app, this).open();
		});
		
	}

	async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
