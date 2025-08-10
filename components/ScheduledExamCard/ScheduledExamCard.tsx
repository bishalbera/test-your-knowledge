import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
const ScheduledExamCard = ({ exam, timeRemaining, isClickable }) => {
  return (
    <GlassCard
      key={exam.id}
      className="relative w-[800px] h-[250px] p-6 transition-all hover:translate-y-[-2px]"
    >
      {isClickable ? (
        <Link
          href={`/profile/${exam.userId}/instruction/${exam.examId}`}
          className="grid h-full grid-cols-3 items-center"
        >
          <div>
            <img
              src={exam.imageUrl}
              alt="exam-image"
              className="h-[200px] w-full rounded-lg object-cover"
            />
          </div>
          <div className="col-span-1 pl-4">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {exam.examTitle}
            </h2>
            {timeRemaining ? (
              <div className="flex space-x-2 text-slate-200">
                {[
                  { label: "D", value: timeRemaining.days },
                  { label: "H", value: timeRemaining.hours },
                  { label: "M", value: timeRemaining.minutes },
                  { label: "S", value: timeRemaining.seconds },
                ].map((t) => (
                  <div key={t.label} className="flex items-center">
                    <div className="rounded bg-white/10 px-2 py-1 text-2xl font-bold">
                      {t.value}
                    </div>
                    <span className="px-1 text-md font-medium">{t.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-rose-400">Exam has started</p>
            )}
          </div>
        </Link>
      ) : (
        <div className="grid h-full grid-cols-3 items-center">
          <div className="col-span-2 flex justify-center">
            <img
              className="h-[200px] w-full rounded-lg object-cover"
              src={exam.imageUrl}
              alt="exam-image"
            />
          </div>
          <div className="col-span-1 pl-4">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {exam.examTitle}
            </h2>
            {timeRemaining ? (
              <div className="flex space-x-2 text-slate-200">
                {[
                  { label: "D", value: timeRemaining.days },
                  { label: "H", value: timeRemaining.hours },
                  { label: "M", value: timeRemaining.minutes },
                  { label: "S", value: timeRemaining.seconds },
                ].map((t) => (
                  <div key={t.label} className="flex items-center">
                    <div className="rounded bg-white/10 px-2 py-1 text-2xl font-bold">
                      {t.value}
                    </div>
                    <span className="px-1 text-md font-medium">{t.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-rose-400">Exam has started</p>
            )}
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default ScheduledExamCard;
