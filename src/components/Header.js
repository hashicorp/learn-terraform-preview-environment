import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Account from 'components/Account';
import { useState } from 'react';

export default function Header(props) {
	const showAccount = async (event) => {
		props.setAccountVisible(true);
	};

	return (
		<>
			<Head>
				<title>HashiCups - Demo App</title>
				<link rel="icon" href="/favicon.ico" />
				<link href={`/favicon-120.png`} rel="apple-touch-icon-precomposed" sizes="120x120" />
				<link href={`/favicon-152.png`} rel="apple-touch-icon-precomposed" sizes="152x152" />
				<link href={`/favicon-167.png`} rel="apple-touch-icon-precomposed" sizes="167x167" />
				<link href={`/favicon-180.png`} rel="apple-touch-icon-precomposed" sizes="180x180" />
			</Head>

			<header className="relative z-20 xs:z-50 flex flex-col items-center justify-center bg-white dark:bg-black/50 shadow-mid dark:shadow-highlight h-[120px] xs:h-[164px]">
				<div className="relative flex items-center justify-between max-w-[1080px] w-full">
					<div className="flex-1 px-8"></div>
					<Link href="/">
						<a className="flex cursor-pointer">
							<Image src="/images/logo.svg" height={88} width={88} className="scale-[0.85] xs:scale-100" />
						</a>
					</Link>
					<div className="flex items-center justify-end flex-1 px-8 text-black/75">
						<button onClick={showAccount} className="flex items-center space-x-2 opacity-75 hover:opacity-100 transition duration-500 ease-in-out dark:invert">
							<span className="hidden xs:block text-sm tracking-widest uppercase pt-px">{props.isAuthed ? 'Account' : 'Sign in'}</span>
							<span className="flex flex-shrink-0">
								<Image src="/images/user.svg" height={24} width={40} />
							</span>
						</button>
					</div>
				</div>
				<div className="absolute left-0 top-0">
					<Image src="/images/demo.svg" height={88} width={88} />
				</div>
				<h1 class="font-bold py-4">HashiCups</h1>
			</header>

			<Account accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} username={props.username} setUsername={props.setUsername} token={props.token} setToken={props.setToken} />
		</>
	);
}
