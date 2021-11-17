import type { NextPage } from 'next';
import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../components/organisms/Navbar/Index';
import MainBanner from '../components/organisms/MainBanner/Index';
import TransactionStep from '../components/organisms/TransactionStep/Index';
import FeaturedGame from '../components/organisms/FeaturedGame/Index';
import Reached from '../components/organisms/Reached/Index';
import Story from '../components/organisms/Story/Index';
import Footer from '../components/organisms/Footer/Index';

const Home: NextPage = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <Navbar />
            <MainBanner />
            <TransactionStep />
            <FeaturedGame />
            <Reached />
            <Story />
            <Footer />
        </>
    )
}

export default Home
