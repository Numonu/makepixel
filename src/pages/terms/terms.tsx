import Wrapper from "../../global/components/atoms/Wrapper";

export default function Terms() {
	return (
		<Wrapper className="max-w-[600px] py-12 px-4 flex flex-col gap-4">
			<div>
				<h1 className="text-xl mb-4">Terms of Service</h1>
				<p className="text-description text-sm">
					Welcome to Spritecrafters. By accessing or using our website,
					you agree to be bound by these Terms of Service. If you do
					not agree to these terms, you may not access or use our
					website.
				</p>
			</div>
			<div>
				<h2 className="mb-2">Limitation of Liability</h2>
				<p className="text-description text-sm">
					We make no warranties or representations about the accuracy
					or completeness of the content on our website, and we are
					not liable for any damages arising from your use of our
					website or the content on it. In no event shall our company
					be liable for any damages whatsoever arising out of or in
					connection with the use or inability to use our website or
					the content on it.
				</p>
			</div>
			<div>
				<h2 className="mb-2">Indemnification</h2>
				<p className="text-description text-sm">
					You agree to indemnify and hold our company, its officers,
					directors, employees, agents, and affiliates, harmless from
					any and all claims, damages, expenses, and liabilities,
					including reasonable attorneys' fees, arising out of or in
					connection with your use of our website or your violation of
					these Terms of Service.
				</p>
			</div>
			<div>
				<h2 className="mb-2">Termination</h2>
				<p className="text-description text-sm">
					We may terminate or suspend your access to our website,
					without prior notice or liability, for any reason
					whatsoever, including without limitation if you breach these
					Terms of Service.
				</p>
			</div>
			<div>
				<h2 className="mb-2">Changes to Terms of Service</h2>
				<p className="text-description text-sm">
					We reserve the right, at our sole discretion, to modify or
					replace these Terms of Service at any time. Your continued
					use of our website after any such changes constitutes your
					acceptance of the new Terms of Service.
				</p>
			</div>
		</Wrapper>
	);
}
