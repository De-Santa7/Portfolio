import Link from "next/link";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] select-none";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-on-accent hover:bg-accent-hover",
  outline: "border border-line-strong text-fg hover:border-accent-line hover:bg-accent-soft",
  ghost: "text-muted hover:text-fg",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type LinkProps = CommonProps & { href: string; download?: string; external?: boolean };
type ButtonProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Pill button. Pass `href` for a link (internal routes use next/link). */
export function Button(props: LinkProps | ButtonProps) {
  const { variant = "solid", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, download, external } = props;
    if (external || download !== undefined || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("/api/")) {
      return (
        <a
          href={href}
          download={download}
          className={classes}
          {...(external || href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}
