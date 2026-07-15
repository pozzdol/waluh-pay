import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BadgePercent,
    Bell,
    ChevronRight,
    Droplets,
    Gamepad2,
    History,
    Home as HomeIcon,
    LayoutGrid,
    type LucideIcon,
    Monitor,
    Moon,
    ReceiptText,
    Search,
    Smartphone,
    Sun,
    User,
    Wallet,
    Wifi,
    Zap,
} from 'lucide-react';
import { useRef, useState } from 'react';

type Category = { label: string; icon: LucideIcon };
type Promo = { title: string; subtitle: string };
type NavTab = { label: string; icon: LucideIcon; active?: boolean };

const categories: Category[] = [
    { label: 'Pulsa', icon: Smartphone },
    { label: 'Paket Data', icon: Wifi },
    { label: 'Token Listrik', icon: Zap },
    { label: 'PLN Pascabayar', icon: ReceiptText },
    { label: 'E-Money', icon: Wallet },
    { label: 'Voucher Game', icon: Gamepad2 },
    { label: 'PDAM', icon: Droplets },
    { label: 'Lainnya', icon: LayoutGrid },
];

// Copy promo netral — tanpa klaim angka (honest copy).
const promos: Promo[] = [
    { title: 'Isi pulsa lebih praktis', subtitle: 'Pilih nominal, bayar, langsung masuk.' },
    { title: 'Bayar tagihan tanpa antre', subtitle: 'Listrik, PDAM, dan lainnya dalam satu tempat.' },
    { title: 'Top up e-money favoritmu', subtitle: 'Aman lewat metode bayar pilihanmu.' },
];

const tabs: NavTab[] = [
    { label: 'Beranda', icon: HomeIcon, active: true },
    { label: 'Riwayat', icon: History },
    { label: 'Promo', icon: BadgePercent },
    { label: 'Akun', icon: User },
];

function Logo({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img src="/images/logo-icon.png" alt="" className="size-8 rounded-lg" />
            <span className="font-display text-lg font-extrabold tracking-tight text-foreground">Waluh Pay</span>
        </div>
    );
}

function ThemeMenuItems() {
    const { appearance, updateAppearance } = useAppearance();
    const opts: { value: 'light' | 'dark' | 'system'; label: string; icon: LucideIcon }[] = [
        { value: 'light', label: 'Terang', icon: Sun },
        { value: 'dark', label: 'Gelap', icon: Moon },
        { value: 'system', label: 'Sistem', icon: Monitor },
    ];
    return (
        <>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Tampilan</DropdownMenuLabel>
            {opts.map((o) => (
                <DropdownMenuItem key={o.value} onClick={() => updateAppearance(o.value)}>
                    <o.icon className="size-4" />
                    <span>{o.label}</span>
                    {appearance === o.value && <span className="ml-auto text-xs text-primary">•</span>}
                </DropdownMenuItem>
            ))}
        </>
    );
}

function AvatarMenu() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const initials = user?.name
        ? user.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : '';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label={user ? 'Akun saya' : 'Masuk atau daftar'}
                className="rounded-full ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                <Avatar className="size-9 border border-border">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                        {initials || <User className="size-4" />}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                {user ? (
                    <>
                        <DropdownMenuLabel className="truncate">{user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/settings/profile">Profil & pengaturan</Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/login">Masuk</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/register">Daftar</Link>
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuSeparator />
                <ThemeMenuItems />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function AppBar() {
    return (
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4">
                <Logo className="md:hidden" />
                <span className="hidden font-display text-xl font-bold text-foreground md:block">Beranda</span>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label="Notifikasi"
                        className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <Bell className="size-5" />
                        <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
                    </button>
                    <AvatarMenu />
                </div>
            </div>
        </header>
    );
}

function SearchField() {
    return (
        <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
                type="search"
                aria-label="Cari produk atau layanan"
                placeholder="Cari produk atau layanan"
                className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
        </div>
    );
}

function CategoryGrid() {
    return (
        <section aria-label="Kategori" className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="grid grid-cols-4 gap-y-5 gap-x-2 md:grid-cols-8">
                {categories.map((c) => (
                    <button
                        key={c.label}
                        type="button"
                        className="group flex flex-col items-center gap-2 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0">
                            <c.icon className="size-6" strokeWidth={2} />
                        </span>
                        <span className="text-center text-xs font-medium leading-tight text-foreground">{c.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}

function PromoCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const onScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const i = Math.round(el.scrollLeft / (el.scrollWidth / promos.length));
        setActive(Math.min(Math.max(i, 0), promos.length - 1));
    };

    const goTo = (i: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: (el.scrollWidth / promos.length) * i, behavior: 'smooth' });
    };

    return (
        <section aria-label="Promo">
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {promos.map((p) => (
                    <article
                        key={p.title}
                        className="flex min-h-[104px] w-[85%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-border bg-card p-4 md:w-[46%]"
                    >
                        <Badge className="w-fit border-transparent bg-highlight text-highlight-foreground hover:bg-highlight">
                            PROMO
                        </Badge>
                        <div className="mt-3">
                            <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                            <p className="mt-0.5 text-sm text-muted-foreground">{p.subtitle}</p>
                        </div>
                    </article>
                ))}
            </div>
            <div className="mt-3 flex justify-center gap-1.5">
                {promos.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Ke promo ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all ${
                            i === active ? 'w-5 bg-primary' : 'w-1.5 bg-border'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

function SideNav() {
    return (
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-1 border-r border-border p-4 md:flex">
            <Logo className="mb-4 px-2" />
            {tabs.map((t) => (
                <button
                    key={t.label}
                    type="button"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        t.active
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                >
                    <t.icon className={`size-5 ${t.active ? 'text-primary' : ''}`} />
                    <span className={t.active ? 'text-primary' : ''}>{t.label}</span>
                </button>
            ))}
        </aside>
    );
}

function BottomNav() {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-2xl items-stretch justify-around">
                {tabs.map((t) => (
                    <button
                        key={t.label}
                        type="button"
                        aria-current={t.active ? 'page' : undefined}
                        className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                        <t.icon className={`size-6 ${t.active ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-xs ${t.active ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                            {t.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default function Home() {
    const { auth } = usePage<SharedData>().props;
    // "Beli lagi" disembunyikan untuk guest (tak ada riwayat) — honest copy.
    const recentPurchases: { title: string; amount: string }[] = [];
    const showBeliLagi = !!auth?.user && recentPurchases.length > 0;

    return (
        <>
            <Head title="Beranda" />
            <div className="min-h-screen bg-background text-foreground">
                <div className="mx-auto flex w-full max-w-6xl">
                    <SideNav />
                    <main className="min-w-0 flex-1">
                        <AppBar />
                        <div className="mx-auto max-w-2xl space-y-6 px-4 pb-24 pt-4 md:pb-8">
                            <SearchField />
                            <CategoryGrid />
                            <PromoCarousel />

                            {showBeliLagi && (
                                <section aria-label="Beli lagi">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h2 className="font-display text-base font-bold text-foreground">Beli lagi</h2>
                                        <button type="button" className="text-sm font-medium text-primary hover:underline">
                                            Lihat semua
                                        </button>
                                    </div>
                                    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                                        {recentPurchases.map((r) => (
                                            <div key={r.title} className="flex items-center justify-between px-4 py-3">
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{r.title}</p>
                                                    <p className="font-mono text-xs text-muted-foreground">{r.amount}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                                >
                                                    Beli lagi <ChevronRight className="size-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </main>
                </div>
                <BottomNav />
            </div>
        </>
    );
}
