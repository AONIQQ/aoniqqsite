// app/layout.tsx (Server Component)
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import ClientProvider from './ClientProvider';  // Import the client-side provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aoniqq - Software Development and Consulting Services',
  description: 'Aoniqq provides software and website development, project management, and consulting services.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '521366960377690'); 
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=521366960377690&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Facebook Pixel Code */}

        {/* Microsoft Clarity Tracking Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "nzpbsvhlnx");
            `,
          }}
        />
        {/* End Microsoft Clarity Tracking Code */}

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16695150096"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16695150096');
            `,
          }}
        />
        {/* End Google Tag */}
      </head>
      <body className={inter.className}>
        {/* ClientProvider wraps all children to provide session context */}
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
