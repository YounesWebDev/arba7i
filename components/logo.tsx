"use client";

import { Wallet } from "lucide-react";
import type React from "react";

export const LogoIcon = (props: React.ComponentProps<"div">) => (
	<div {...props}>
		<Wallet className="h-4 w-4 text-primary" />
	</div>
);

export const Logo = (props: React.ComponentProps<"div">) => (
	<div className="flex flex-col items-center justify-center" {...props}>
		<Wallet className="h-6 w-6 text-primary" />
	</div>
);
