import { useState } from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
}

function PasswordInput({ password, setPassword }: PasswordInputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="section">
            <input
                id="password-field"
                className="form-control password-input"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadej heslo..."
                autoComplete="new-password"
            />

            <button
                type="button"
                className="btn btn-outline-primary toggle-btn"
                onClick={() => setVisible((v) => !v)}
            >
                {visible ? "Skrýt heslo" : "Zobrazit heslo"}
            </button>
        </div>
    );
}

export default PasswordInput;
