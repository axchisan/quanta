import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quanta',
  description: 'Juego educativo de Física y Química con IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}