export const metadata = {
  title: "Ma. Paz Galarraga J. | Portfolio",
  description: "Global Development & Entrepreneurship",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#F9F9F9" }}>
        {children}
      </body>
    </html>
  );
}
