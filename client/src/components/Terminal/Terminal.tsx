import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { TerminalProps, TerminalInputRowProps, CommandHistory } from "./Types"
import { Stack, Text, Input } from "@mantine/core"


const Terminal = (props: TerminalProps) => {
	const [history, setHistory] = useState<Array<CommandHistory>>(props.commandHistory)
	const codeNodes = history.map(val => <TerminalTextRow>{`${props.commandPrompt} ${val.command} ${val.args.join(' ')}`}<br /> {val.result}</TerminalTextRow>)
	const divRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (props.autoScroll) {
			divRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	})

	const onTerminalInputSubmit = (input: string) => {
		const inputSplitted = input.split(' ')
		setHistory([...history, { command: inputSplitted.shift()!, args: inputSplitted, result: 'result' }])
	}

	const fetchTerminalHistoryInReverse = (input: number) => {
		if (input < 1 || input > history.length) {
			return ''
		}
		const commandHistory = history[history.length - input]
		return `${commandHistory.command} ${commandHistory.args.join(' ')}`
	}

	return (
		<Stack bg='dark.9' p={'sm'} gap={0} h={'6rem'} style={{ overflowX: 'auto', borderRadius: 'var(--mantine-radius-default)' }}>
			{codeNodes}
			{props.interactive ?
				<TerminalInputRow
					ref={divRef}
					commandPrompt={props.commandPrompt}
					onSubmit={onTerminalInputSubmit}
					fetchHistory={fetchTerminalHistoryInReverse} /> : null}
		</Stack>
	)
}

const TerminalTextRow = (props: PropsWithChildren) => {
	return (
		<Text size='md' ff='monospace' c='green' lh='h1'>
			{props.children}
		</Text >
	)
}

const TerminalInputRow = (props: TerminalInputRowProps) => {
	const [state, setState] = useState({ textInput: props.commandPrompt, historyIndex: 0 })

	return (
		<Input ref={props.ref}
			m={0}
			p={0}
			variant="unstyled"
			styles={{
				input: {
					color: 'var(--mantine-color-green-text)',
					fontSize: 'var(--mantine-font-size-md)',
					fontFamily: 'var(--mantine-font-family-monospace)'
				}
			}}
			value={state.textInput}
			onChange={val => setState({ ...state, textInput: val.currentTarget.value })}
			onKeyDown={event => {
				switch (event.key) {
					case 'Enter':
						props.onSubmit(state.textInput.substring(props.commandPrompt.length))
						setState({ textInput: props.commandPrompt, historyIndex: 0 })
						break
					case 'ArrowUp':
						event.preventDefault()
						setState({
							textInput: props.commandPrompt + props.fetchHistory(state.historyIndex + 1),
							historyIndex: state.historyIndex + 1
						})
						break
					case 'ArrowDown':
						setState({
							textInput: props.commandPrompt + props.fetchHistory(state.historyIndex - 1),
							historyIndex: state.historyIndex - 1
						})
						break
				}
			}} />
	)
}

export default Terminal;