interface CharacterSequenceValidatorProps {
    password: string;
}

interface SequenceValidationResult {
    isValid: boolean;
    validSequenceCount: number;
    message: string;
}

function validateSequence(password: string): SequenceValidationResult {
    if (password.length < 4) {
        return { isValid: false, validSequenceCount: 0, message: "Heslo je příliš krátké pro analýzu sekvencí." };
    }
    let validSequenceCount = 0;
    for (let i = 0; i <= password.length - 4; i++) {
        const window = password.slice(i, i + 4);
        if (/[a-z]/.test(window) && /[A-Z]/.test(window) && /[0-9]/.test(window) && /[!@#$%^&*]/.test(window)) {
            validSequenceCount++;
        }
    }
    return {
        isValid: validSequenceCount > 0,
        validSequenceCount,
        message: validSequenceCount > 0
            ? `Nalezeno ${validSequenceCount} validní sekvence (malé, velké, číslo a spec. znak za sebou).`
            : "Žádná sekvence neobsahuje všechny 4 typy znaků za sebou.",
    };
}

function CharacterSequenceValidator({ password }: CharacterSequenceValidatorProps) {
    const result: SequenceValidationResult = validateSequence(password);
    const untouched = password.length === 0;

    return (
        <div className="section">
            <p className="section-title">Validátor sekvencí</p>
            <p className={untouched ? "text-muted" : result.isValid ? "text-success" : "text-error"}>
                {untouched ? "Čekám na zadání hesla…" : result.message}
            </p>
        </div>
    );
}

export default CharacterSequenceValidator;
