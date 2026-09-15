import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
	return (
		<Layout
			title="agentCourses"
			description="Dark software factory scaffold"
		>
			<main className="hero hero--primary">
				<div className="container">
					<h1 className="hero__title">agentCourses</h1>
					<p className="hero__subtitle">Quantify harness engineering, agentic coding harnesses, and model selection against software quality.</p>
					<div>
						<Link
							className="button button--secondary button--lg"
							to="/docs/api/healthcheck"
						>
							Healthcheck API
						</Link>
					</div>
				</div>
			</main>
		</Layout>
	);
}
