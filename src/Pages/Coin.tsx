import { useNavigate, useParams } from "react-router"
import { fetchCryptoById } from "../api/cryptoApi"
import { useEffect, useState } from "react"
import CoinLoader from './../components/CoinLoader';
import CoinChart from "../components/CoinChart";
import LogoSection from "../components/LogoSection";
import Footer from "../components/Footer";

export default function Coin() {
  type Coin = {
    id: string;
    name: string;
    symbol: string;
    image: {
      large: string;
    };
    market_data: {
      current_price: {
        usd: number;
      };
      price_change_24h: number;
      high_24h: {
        usd: number;
      };
      low_24h: {
        usd: number;
      };
      market_cap: {
        usd: number;
      };
      total_volume: {
        usd: number;
      };
      circulating_supply: number;
      total_supply: number;
    };
    market_cap_rank: number;
  };
  const navigate = useNavigate()
  const { id } = useParams()
  const [coin, setCoin] = useState<Coin | null>(null)
  const [load, setLoad] = useState(true)
  useEffect(() => {
    fetchCoinData()
  }, [id])

  const fetchCoinData = async () => {
    try {
      const coinData = await fetchCryptoById(id!)
      setCoin(coinData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    <>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <LogoSection />
            <button onClick={() => navigate('/')} className="back-button">
              Back to list
            </button>
          </div>
        </header>
        {load ? (
          <CoinLoader />
        ) : (
          <>
            {coin ?
              <>
                <div className="coin-details">
                  <div className="coin-header">
                    <div className="coin-title">
                      <img src={coin.image.large} alt={coin.name} />
                      <div>
                        <h1>{coin.name}</h1>
                        <p className="symbol">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <span className="rank">Rank #{coin.market_cap_rank}</span>
                  </div>

                  <div className="coin-price-section">
                    <div className="current-price">
                      <h2>${coin.market_data.current_price.usd < 0.01 ? coin.market_data.current_price.usd.toFixed(8) : coin.market_data.current_price.usd.toFixed(2)}</h2>
                      <span className={`change-badge ${coin.market_data.price_change_24h !== null && coin.market_data.price_change_24h >= 0 ? 'positive' : 'negative'}`}>
                        {coin.market_data.price_change_24h !== null ? (coin.market_data.price_change_24h >= 0 ? '↑ +' : '↓ ') : ''}
                        {coin.market_data.price_change_24h?.toFixed(2) ?? 'N/A'}%
                      </span>
                    </div>
                    <div className="price-ranges">
                      <div className="price-range">
                        <span className="range-label">24h High</span>
                        <span className="range-value">${coin.market_data.high_24h.usd}</span>
                      </div>
                      <div className="price-range">
                        <span className="range-label">24h Low</span>
                        <span className="range-value">${coin.market_data.low_24h.usd}</span>
                      </div>
                    </div>
                  </div>
                  <CoinChart id={id!} />

                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-label">Market Cap</span>
                      <span className="stat-value">${coin.market_data.market_cap.usd.toLocaleString()}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Volume (24h) </span>
                      <span className="stat-value">${coin.market_data.total_volume.usd.toLocaleString()}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Circulating Supply</span>
                      <span className="stat-value">${coin.market_data.circulating_supply?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Total Supply</span>
                      <span className="stat-value">${coin.market_data.total_supply?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>

                </div>
              </> :
              <>
                <div className="no-results">
                  <img src="/coin-not-found.png" alt="Coin not found" />
                  <button onClick={() => navigate('/')} className="back-button">
                    Back to Home page
                  </button>
                </div>
              </>
            }
          </>
        )}
        <Footer />
      </div>
    </>
  )
}