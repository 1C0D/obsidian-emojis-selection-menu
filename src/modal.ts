import { App, ButtonComponent, Editor, EditorPosition, MarkdownView, Modal, Setting } from "obsidian";
import EmojiSelMenu from "./main";

export class EmojiSelModal extends Modal {
	constructor(
		app: App,
		public plugin: EmojiSelMenu
	) {
		super(app);
		this.plugin = plugin
		this.modalEl.addClass("esm-modal");
	}

	onOpen() {
		const { contentEl, plugin } = this;
		const { settings } = plugin;
		contentEl.empty();

		new Setting(contentEl).addButton((button) => {
			button.setButtonText("⚙️").setTooltip("open plugin settings").onClick(async(evt: MouseEvent) => {
				const id = this.plugin.manifest.id
				//@ts-ignore
				this.app.setting.openTabById(
					id
				);
				await(this.app as any).setting.open();
			})
		}).setName("Insert:").setDesc("at cursor →  click,  at start →  ctrl+click, at end line → alt+click").setClass("esm-settings-button")

		const myEmojis = settings.myEmojis;
		const emojis = contentEl.createEl("div", { cls: "esm-emojis-container" });
		const setting = new Setting(contentEl)
		for (const emojiItem of myEmojis) {
			new ButtonComponent(emojis)
				.setButtonText(emojiItem.emoji)
				.setClass("esm-emojis-container-button")
				.setTooltip(emojiItem.desc)
				.onClick((evt: MouseEvent) => {
					if (evt.ctrlKey || evt.metaKey) {
						this.atStart(emojiItem.emoji);
					} else if (evt.altKey) {
						this.atEnd(emojiItem.emoji);
					} else {
						this.insert(emojiItem.emoji);
					}
					this.close();
				});
		};
	}

	insert(emoji: string) {
		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView)
		if (!markdownView) return
		const editor = markdownView.editor
		let cursor = editor.getCursor()
		const { ch, line } = cursor

		editor.replaceRange(emoji, cursor)
		cursor = {
			line: line,
			ch: ch + 1
		}
		editor.setCursor(cursor)
	}


	atStart(emoji: string) {
		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!markdownView) return;
		const editor = markdownView.editor;
		let cursor = editor.getCursor();
		const { line } = cursor;
		const startCh = this.getChStart(editor, cursor);

		const replaceRange = {
			from: { line, ch: startCh },
			to: { line, ch: startCh }
		};

		editor.replaceRange(emoji + ' ', replaceRange.from, replaceRange.to);

		// movz cursor
		cursor = {
			line,
			ch: startCh + emoji.length + 1 // added space
		};
		editor.setCursor(cursor);
	}


	getChStart(editor: Editor, cursor: EditorPosition) {
		const lineContent = editor.getLine(cursor.line);
		const match = lineContent.match(/^\s*([-+*])\s+(.*)/);
		const checkboxMatch = lineContent.match(/^\s*([-+*]) \[([xX ])\]\s+(.*)/);

		if (checkboxMatch) {
			const startCh = checkboxMatch[0].indexOf(checkboxMatch[3]);
			return startCh;
		}
		else if (match) {
			const startCh = match[0].indexOf(match[2]);
			return startCh;
		} 
		 else {
			return 0;
		}
	}



	atEnd(emoji: string) {
		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView)
		if (!markdownView) return
		const editor = markdownView.editor
		let cursor = editor.getCursor()
		const { ch, line } = cursor
		const length = editor.getLine(cursor.line).length;
		const cursorPos = { line: line, ch: length };
		editor.replaceRange(" " + emoji, cursorPos);
		cursor = {
			line: line,
			ch: length + 2
		}
		editor.setCursor(cursor)
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}