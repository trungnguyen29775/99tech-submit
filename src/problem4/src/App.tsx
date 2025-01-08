import React, { useState } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App: React.FC = () => {
    const [n, setN] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<string>('');
    const [firstWay, setFirstWay] = useState<string>('');
    const [secondWay, setSecondWay] = useState<string>('');
    const [thirdWay, setThirdWay] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const validateN = (value: string): boolean => {
        const num = Number(value);
        if (isNaN(num)) {
            setError('N must be a number');
            return false;
        }
        if (!Number.isInteger(num)) {
            setError('N must be an integer');
            return false;
        }
        if (num < 0) {
            setError('N must be a non-negative number');
            return false;
        }
        setError('');
        return true;
    };

    const sum_to_n_a = async (n: number) => {
        let total = 0;
        setFirstWay('');
        setCurrentStep('Method A: Looping');
        for (let i = 1; i <= n; i++) {
            total += i;
            if (i < 3) {
                await delay(500);
                setFirstWay((preState) => preState + i + ' + ');
            }

            if (i === 3) {
                await delay(500);
                setFirstWay((preState) => preState + i + ' + .... + ');
            }

            if (i === n) {
                await delay(500);
                setFirstWay((preState) => preState + i);
                await delay(500);
                setFirstWay((preState) => preState + ` = ${total}` + ' Complexity: O(n) = ' + n);
            }
        }
    };

    const sum_to_n_b = async (n: number) => {
        setSecondWay('');
        setCurrentStep('Method B: Formula');
        await delay(500);
        const total = (n * (n + 1)) / 2;
        setSecondWay(`${n} * (${n} + 1) / 2 = ${total} Complexity: O(1) = 1`);
    };

    const recursiveSum = (n: number): number => {
        if (n === 0) return 0;
        return n + recursiveSum(n - 1);
    };

    const sum_to_n_c = async (n: number) => {
        setThirdWay('');
        setCurrentStep('Method C: Recursion');
        await delay(500);
        const total = recursiveSum(n);
        setThirdWay(`1 + 2 + ... + ${n} = ${total} Complexity: O(n) = ${n}`);
    };

    const handleCalculate = async () => {
        if (validateN(n)) {
            const num = Number(n);
            setLoading(true);
            setResult(null);
            setFirstWay('');
            setSecondWay('');
            setThirdWay('');
            await sum_to_n_a(num);
            await delay(1000);
            await sum_to_n_b(num);
            await delay(1000);
            await sum_to_n_c(num);
            setResult((num * (num + 1)) / 2);
            setLoading(false);
            setCurrentStep('All methods completed');
        } else {
            setResult(null);
        }
    };

    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '50px',
                padding: 4,
                backgroundColor: '#f5f5f5',
                borderRadius: 4,
                boxShadow: 2,
            }}
        >
            <Typography variant="h4" color="primary" gutterBottom>
                Sum to N in 3 ways
            </Typography>
            <TextField
                label="Enter a non-negative integer"
                value={n}
                onChange={(e) => setN(e.target.value)}
                variant="outlined"
                sx={{ marginBottom: 2, width: '300px' }}
            />
            <Box sx={{ width: '100%' }}>
                <Button
                    sx={{ width: '300px', height: '50px' }}
                    variant="contained"
                    color="primary"
                    onClick={handleCalculate}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Calculate'}
                </Button>
            </Box>

            {error && <Typography color="error">{error}</Typography>}
            {currentStep && (
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                    {currentStep}
                </Typography>
            )}
            {firstWay && (
                <Typography variant="body1" color="secondary" sx={{ marginTop: 2 }}>
                    <strong>Method A:</strong> {firstWay}
                </Typography>
            )}
            {secondWay && (
                <Typography variant="body1" color="info.main" sx={{ marginTop: 2 }}>
                    <strong>Method B:</strong> {secondWay}
                </Typography>
            )}
            {thirdWay && (
                <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
                    <strong>Method C:</strong> {thirdWay}
                </Typography>
            )}
            {result !== null && (
                <Typography variant="h5" color="primary" sx={{ marginTop: 4 }}>
                    Final Result: {result}
                </Typography>
            )}
        </Box>
    );
};

export default App;
