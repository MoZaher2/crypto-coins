import { Link } from "react-router"

type Coins = {
    id: string,
    image: string,
    symbol: string,
    market_cap_rank: number,
    current_price: number,
    price_change_24h: number,
    market_cap: number
}
export default function CoinCard({ coin }: { coin: Coins }) {
    return (
        <Link to={`/crypto-coin/${coin.id}`} style={{ textDecoration: 'none'}}>
            <div className="crypto-card">
                <div className="crypto-header">
                    <div className="crypto-info">
                        <img src={coin.image} alt={coin.id} />
                        <div>
                            <h3>{coin.id}</h3>
                            <p className="symbol">{coin.symbol}</p>
                            <span className="rank">#{coin.market_cap_rank}</span>
                        </div>
                    </div>
                </div>
                <div className="crypto-price">
                    <p className="price">${coin.current_price < 0.01 ? coin.current_price.toFixed(8) : coin.current_price.toFixed(2)}</p>
                    <p className={`change ${coin.price_change_24h !== null && coin.price_change_24h >= 0 ? 'positive' : 'negative'}`}>
                        {coin.price_change_24h !== null ? (coin.price_change_24h >= 0 ? '↑ +' : '↓ ') : ''}
                        {coin.price_change_24h?.toFixed(2) ?? 'N/A'}%
                    </p>
                </div>
                <div className="crypto-status">
                    <div className="stat">
                        <span className="stat-label">Market Cap</span>
                        <span className="stat-value">{coin.market_cap > 1e12 ? `${(coin.market_cap / 1e12).toFixed(2)}T` : coin.market_cap > 1e9 ? `${(coin.market_cap / 1e9).toFixed(2)}B` : coin.market_cap > 1e6 ? `${(coin.market_cap / 1e6).toFixed(2)}M` : coin.market_cap}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
