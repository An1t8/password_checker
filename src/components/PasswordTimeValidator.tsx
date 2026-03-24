interface PasswordTimeValidatorProps {
    password: string;
    createdAt: number | null;
}

interface TimeValidationResult {
    isValid: boolean;
    elapsedSeconds: number | null;
    tooFast: boolean;
    message: string;
}

const MIN_SECONDS = 3;

function validateTime(password: string, createdAt: number | null): TimeValidationResult {
    if (!createdAt || password.length === 0) {
        return { isValid: false, elapsedSeconds: null, tooFast: false, message: "Čekám na zadání hesla…" };
    }
    const elapsedSeconds = Math.round((Date.now() - createdAt) / 1000);
    const tooFast = elapsedSeconds < MIN_SECONDS;
    return {
        isValid: !tooFast,
        elapsedSeconds,
        tooFast,
        message: tooFast
            ? `Heslo zadáno příliš rychle (${elapsedSeconds}s) — možné automatické generování.`
            : `Heslo zadáno za ${elapsedSeconds}s — v pořádku.`,
    };
}

function PasswordTimeValidator({ password, createdAt }: PasswordTimeValidatorProps) {
    const result: TimeValidationResult = validateTime(password, createdAt);
    const untouched = password.length === 0 || !createdAt;

    return (
        <div className="section">
            <p className="section-title">Časová validace</p>
            <p className={untouched ? "text-muted" : result.isValid ? "text-success" : "text-error"}>
                {result.message}
            </p>
        </div>
    );
}

export default PasswordTimeValidator;