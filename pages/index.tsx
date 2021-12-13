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
import Head from "next/head";

const Home: NextPage = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <Head>
                <title>StoreGG - Jasa TopUp Terpercaya</title>
                <meta name='description' content='Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati' />
                <meta property='og:title' content='StoreGG - Jasa TopUp Terpercaya' />
                <meta property='og:description' content='Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati' />
                <meta property='og:image' content='https://cdna.artstation.com/p/assets/images/images/023/459/708/medium/vaibhav-verma-game-logo.jpg?1579270067' />
            </Head>
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
