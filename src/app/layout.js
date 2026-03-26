import "./globals.css";

export const metadata = {
  title: "ERCHOMAI | Protocol_v4",
  description: "Security Lifecycle Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}