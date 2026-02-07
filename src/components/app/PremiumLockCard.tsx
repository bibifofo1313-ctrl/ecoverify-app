import { FileText, Lock } from "lucide-react";
import { Button } from "../common/Button";

interface PremiumLockCardProps {
  onUnlock: () => void;
}

export const PremiumLockCard = ({ onUnlock }: PremiumLockCardProps) => (
  <div className="card relative overflow-hidden p-6">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-slate-900/60" />
    <div className="relative z-10 space-y-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-2">
          <FileText className="h-5 w-5 text-emerald-200" />
        </div>
        <div>
          <p className="eyebrow">Premium</p>
          <h3 className="heading-3">Official certification PDF</h3>
        </div>
      </div>
      <p className="text-sm text-slate-400">
        Locked until verification is complete. Upgrade to access the auditor-signed report
        with compliance evidence and branded export.
      </p>
      <div className="flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-4">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Lock className="h-4 w-4 text-emerald-300" />
          Secure PDF export
        </div>
        <Button variant="secondary" onClick={onUnlock} aria-label="Unlock premium certification">
          Unlock
        </Button>
      </div>
    </div>
  </div>
);
