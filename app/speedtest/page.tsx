import { Metadata } from 'next';
import Speedtest from './speedtest';

const Page = () => {
  return (
    <div>
      <Speedtest />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Page Speed Test - Aoniqq",
  description: "Analyze your website's loading speed and performance metrics.",
  robots: { index: false, follow: false },
};

export default Page;
