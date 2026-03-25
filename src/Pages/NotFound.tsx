import { useNavigate } from 'react-router'
import Footer from '../components/Footer'

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className='app'>
            <div className="not-Found">
                <img src="/404.png" alt="Page not found" className='error-logo' width={300} height={200} />
                <h1 className='error-text'>404 - Page Not Found</h1>
                <p className='error-text'>The page you are looking for does not exist.</p>
                <button onClick={() => navigate('/')} className="back-button">
                    Back to Home page
                </button>
            </div>
            <Footer />
        </div>
    )
}
