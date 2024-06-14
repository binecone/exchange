const Footer = () => {
  return (
    <footer className="py-6 border-t md:px-8 md:py-0 border-border/80">
      <div className="container flex flex-col items-center justify-center gap-4 mx-auto md:h-[10vh] md:flex-row">
        <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
        Built with ❤️ by Blockchain Intelligence.
          {/* Built with ❤️ by {" "}

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            BI
          </a>
          . */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
