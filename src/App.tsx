import { useState, useEffect } from "react";
import PasswordInput from "../src/components/PasswordInput";
import PasswordStrength from "../src/components/PasswordStrength";
import CharacterSequenceValidator from "../src/components/CharacterSequenceValidator";
import PasswordTimeValidator from "../src/components/PasswordTimeValidator";
import CountryFlagValidator from "./components/CountryFlagValidator.tsx";

import "./App.css";

function evaluatePassword(password: string): string {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 1) return "Slabé";
    if (score <= 2) return "Střední";
    if (score === 3) return "Dobré";
    return "Silné";
}

function App() {
    const [password, setPassword] = useState("");
    const [passwordCreatedAt, setPasswordCreatedAt] = useState<number | null>(null);
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        const strength = evaluatePassword(password);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPasswordStrength(strength);
    }, [password]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPass => {
                const action = Math.random() < 0.5 ? "add" : "remove";
                if(action === "add"){
                    return prevPass + " 😝";
                }else{
                    if(prevPass.length ===0) return prevPass;
                    const chars = Array.from(prevPass);
                    const index = Math.floor(Math.random() * chars.length);
                    chars.splice(index, 1);
                    return chars.join("");
                }
            });
        }, 10000);

        return ()=> clearInterval(sabotageInterval);
    }, []);

    const handleSetPassword = (newPassword: string) => {
        if (!passwordCreatedAt && newPassword.length > 0) {
            setPasswordCreatedAt(Date.now());
        }
        if (newPassword.length === 0) {
            setPasswordCreatedAt(null);
        }
        setPassword(newPassword);
    };

    return (
        <div className="app container">
            <div className="card shadow p-4">
                <h1 className="text-center mb-4">Password Game</h1>

                <div className="card-body">
                    <PasswordInput password={password} setPassword={handleSetPassword} />
                    <PasswordStrength password={password} />

                    {password.length > 0 && (
                        <p className="text-center">
                            Síla hesla: <strong>{passwordStrength}</strong>
                        </p>
                    )}

                    <CharacterSequenceValidator password={password} />
                    <PasswordTimeValidator
                        password={password}
                        createdAt={passwordCreatedAt}
                    />
                    <CountryFlagValidator password={password} />
                </div>
            </div>
        </div>
    );
}

export default App;