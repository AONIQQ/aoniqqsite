import { Metadata } from 'next';
import Speedtest from './speedtest'; // Ensure correct import of Speedtest component


const Page = () => {
  return (
    <div>
      <Speedtest />
    </div>
  );
};




export const metadata: Metadata = {
  title: 'Website Page Speed Report Generator - Aoniqq',
  description: 'Generate detailed reports on your website’s loading speed and performance metrics to optimize user experience.',
};

export default Page;