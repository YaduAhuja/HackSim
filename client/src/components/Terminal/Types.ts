import { RefObject } from "react"

export interface TerminalProps {
	commandHistory: CommandHistory[]
	autoScroll: boolean
	commandPrompt: string
	interactive: boolean
}

export interface TerminalInputRowProps {
	ref: RefObject<HTMLInputElement | null>
	commandPrompt: string
	onSubmit(input: string): void
	fetchHistory(index: number): string
}

export interface CommandHistory {
	command: string
	args: string[]
	result: string
}