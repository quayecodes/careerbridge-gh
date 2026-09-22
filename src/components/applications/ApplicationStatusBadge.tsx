import {
  Send,
  Clock,
  Award,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Props {
  status: string;
}

export function ApplicationStatusBadge({ status }: Props) {
  switch (status) {
    case "APPLIED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Send className="h-3 w-3" /> Submitted
        </span>
      );
    case "UNDER_REVIEW":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
          <Clock className="h-3 w-3" /> Under Review
        </span>
      );
    case "SHORTLISTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
          <Award className="h-3 w-3" /> Shortlisted
        </span>
      );
    case "INTERVIEW_SCHEDULED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
          <CalendarCheck className="h-3 w-3" /> Interview Scheduled
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="h-3 w-3" /> Offer Received
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
          <XCircle className="h-3 w-3" /> Not Selected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
          <AlertCircle className="h-3 w-3" /> {status}
        </span>
      );
  }
}
