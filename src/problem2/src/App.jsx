import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    CircularProgress,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function CurrencySwapForm() {
    const [tokenData, setTokenData] = useState([]);
    const [sourceToken, setSourceToken] = useState('');
    const [targetToken, setTargetToken] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isConverting, setIsConverting] = useState(false);

    const removeDuplicatesByLatestDate = (tokenData) => {
        const latestTokens = {};
        tokenData.forEach((item) => {
            const { currency, date } = item;
            const currentDate = new Date(date);
            if (!latestTokens[currency] || currentDate > new Date(latestTokens[currency].date)) {
                latestTokens[currency] = item;
            }
        });
        return Object.values(latestTokens);
    };

    const fetchExchangeRate = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://interview.switcheo.com/prices.json');
            if (res.data) {
                setTokenData(removeDuplicatesByLatestDate(res.data));
            }
        } catch (err) {
            console.error('Failed to fetch token data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    const validateAmountInput = (amount) => {
        if (amount === '') {
            return { isValid: false, message: 'Amount cannot be empty' };
        }
        if (isNaN(amount)) {
            return { isValid: false, message: 'Amount must be a number' };
        }
        if (Number(amount) <= 0) {
            return { isValid: false, message: 'Amount must be a positive number' };
        }
        return { isValid: true, message: '' };
    };

    const calculateSwapAmount = () => {
        const source = tokenData.find((token) => token.currency === sourceToken);
        const target = tokenData.find((token) => token.currency === targetToken);

        if (!source || !target) {
            setConvertedAmount(0);
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setConvertedAmount(0);
            return;
        }

        const sourcePrice = source.price;
        const targetPrice = target.price;
        const result = (Number(amount) * sourcePrice) / targetPrice;
        setConvertedAmount(result.toFixed(4));
    };

    const handleSourceChange = (event) => {
        setSourceToken(event.target.value);
    };

    const handleTargetChange = (event) => {
        setTargetToken(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleConvert = () => {
        const validation = validateAmountInput(amount);
        if (!sourceToken || !targetToken) {
            setError('Please select both source and target tokens');
            return;
        }

        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        setError('');
        setIsConverting(true);
        setTimeout(() => {
            calculateSwapAmount();
            setIsConverting(false);
        }, 1000);
    };

    const handleTokenSwap = () => {
        setSourceToken(targetToken);
        setTargetToken(sourceToken);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                padding: 4,
                gap: 3,
                height: '100vh',
                width: '100%',
                background: 'linear-gradient(135deg, #f0f4ff, #dcedc8)',
                borderRadius: 4,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                Currency Swap
            </Typography>

            {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                        <FormControl sx={{ minWidth: '200px' }}>
                            <InputLabel>Source Token</InputLabel>
                            <Select value={sourceToken} onChange={handleSourceChange} label="Source Token">
                                {tokenData.map((item, index) => (
                                    <MenuItem key={index} value={item.currency}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`}
                                                alt={item.currency}
                                                style={{ width: 24, height: 24, marginRight: 10 }}
                                            />
                                            <Typography>{item.currency.toUpperCase()}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <IconButton
                            onClick={handleTokenSwap}
                            color="primary"
                            sx={{
                                transform: 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': { transform: 'rotate(180deg)' },
                            }}
                        >
                            <SwapHorizIcon fontSize="large" />
                        </IconButton>

                        <FormControl sx={{ minWidth: '200px' }}>
                            <InputLabel>Target Token</InputLabel>
                            <Select value={targetToken} onChange={handleTargetChange} label="Target Token">
                                {tokenData.map((item, index) => (
                                    <MenuItem key={index} value={item.currency}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`}
                                                alt={item.currency}
                                                style={{ width: 24, height: 24, marginRight: 10 }}
                                            />
                                            <Typography>{item.currency.toUpperCase()}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            value={amount}
                            onChange={handleAmountChange}
                            error={!!error}
                            helperText={error}
                            sx={{ minWidth: '200px' }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConvert}
                        disabled={isConverting}
                        sx={{ width: '300px', height: '50px' }}
                    >
                        {isConverting ? <CircularProgress size={24} /> : 'Convert'}
                    </Button>

                    <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#004d40' }}>
                        Converted Amount: {convertedAmount}
                    </Typography>
                </>
            )}
        </Box>
    );
}

export default CurrencySwapForm;
