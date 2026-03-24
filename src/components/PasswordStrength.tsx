interface PasswordStrengthProps {
    password: string;
}

interface Criterion {
    label: string;
    test: (pw: string) => boolean;
}

const criteria: Criterion[] = [
    { label: "Minimálně 8 znaků", test: (pw) => pw.length >= 8 },
    { label: "Alespoň jedno velké písmeno", test: (pw) => /[A-Z]/.test(pw) },
    { label: "Alespoň jedno číslo", test: (pw) => /[0-9]/.test(pw) },
    { label: "Alespoň jeden speciální znak (!@#$%^&*)", test: (pw) => /[!@#$%^&*]/.test(pw) },
];

function getScore(password: string): number {
    return criteria.filter((c) => c.test(password)).length;
}

function getStrengthLabel(score: number): string {
    if (score <= 1) return "Slabé";
    if (score <= 2) return "Střední";
    if (score === 3) return "Dobré";
    return "Silné";
}

function getStrengthColor(score: number): string {
    if (score <= 1) return "#ef4444";
    if (score <= 2) return "#f59e0b";
    if (score === 3) return "#3b82f6";
    return "#10b981";
}

function PasswordStrength({ password }: PasswordStrengthProps) {
    const score = getScore(password);
    const color = getStrengthColor(score);
    const pct = (score / criteria.length) * 100;

    return (
        <div className="section">
            <p className="section-title">Síla hesla</p>

            <div className="strength-bar-track">
                <div className="strength-bar-fill" style={{
                    width: password.length ? `${pct}%` : "0%",
                    background: color,
                }} />
            </div>

            {password.length > 0 && (
                <p className="strength-label" style={{ color }}>
                    {getStrengthLabel(score)}
                </p>
            )}

            <ul className="criteria-list">
                {criteria.map((c) => {
                    const passed = password.length > 0 && c.test(password);
                    return (
                        <li key={c.label} className={passed ? "criterion passed" : "criterion"}>
                            {c.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PasswordStrength;
