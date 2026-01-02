import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Psychodynamic Assessment
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/assessment"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Assessment
                        </Link>
                        <Link
                            href="/resources"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Resources
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
