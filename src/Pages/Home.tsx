import { useEffect, useState } from "react"
import { fetchCryptoCoins } from "../api/cryptoApi"
import CoinLoader from '../components/CoinLoader';
import CoinCard from "../components/CoinCard";
import LogoSection from "../components/LogoSection";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

export default function Home() {
    type Coins = {
        id: string,
        image: string,
        symbol: string,
        price_change_24h: number,
        name: string;
        current_price: number;
        price_change_percentage_24h: number;
        market_cap: number;
        market_cap_rank: number;
    }
    const [coins, setCoins] = useState<Coins[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<Coins[]>([]);
    const [load, setLoad] = useState(true);
    const [view, setView] = useState('grid');
    const [sortBy, setSortBy] = useState('market_cap_rank');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData()
    }, [currentPage])
    const fetchData = async () => {
        try {
            setLoad(true)
            const data = await fetchCryptoCoins({ currentPage })
            setCoins(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    }
    useEffect(() => {
        filterCoins();
    }, [sortBy, coins, search])
    const filterCoins = () => {
        const sortedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
        switch (sortBy) {
            case 'name':
                sortedCoins.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price':
                sortedCoins.sort((a, b) => a.current_price - b.current_price);
                break;
            case 'price_desc':
                sortedCoins.sort((a, b) => b.current_price - a.current_price);
                break;
            case 'change':
                sortedCoins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
                break;
            case 'market_cap':
                sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
                break;
            default:
                sortedCoins.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
                break;
        }
        setFilteredCoins(sortedCoins);
    }
    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <LogoSection />
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search with name or sympol..."
                            className="search-input"
                            onChange={(e) => { setSearch(e.target.value.toLowerCase()); }}
                        />
                    </div>
                </div>
            </header>
            <div className="controls">
                <div className="filter-group">
                    <label htmlFor="sort">Sort by:</label>
                    <select name="sort" id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
                        <option value="market_cap_rank">Rank</option>
                        <option value="name">Name</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                        <option value="change">24h Change</option>
                        <option value="market_cap">Market Cap</option>
                    </select>
                </div>
                <div className="view-toggle">
                    <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
                        grid
                    </button>
                    <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
                        list
                    </button>
                </div>
            </div>

            {load ? <CoinLoader /> :
                <>
                    <div className={`crypto-container ${view}`}>
                        {filteredCoins.map((coin: Coins, key) => <CoinCard key={key} coin={coin} />)}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        setCurrentPage={setCurrentPage}
                    />
                </>

            }
            <Footer />
        </div>
    )
}
