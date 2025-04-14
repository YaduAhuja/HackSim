import React from "react";
import { Button, Center, Input, PasswordInput, Stack } from "@mantine/core";
import Terminal from "../components/Terminal/Terminal";

const LoginPage: React.FC = () => {
	return (
		<Center mih={'100vh'}>
			<Stack w={'24rem'}>
				<Input size='md' placeholder='Username' />
				<PasswordInput size='md' placeholder='Password' />
				<Button size='md' variant='light'>Login</Button>
				<Terminal
					commandHistory={[{ command: 'Welcome Hacker,', args: [], result: 'Type \'help\' for a list of commands' }]}
					commandPrompt="> "
					autoScroll={true}
					interactive={true} />
			</Stack >
		</Center>
	)
}


export default LoginPage;