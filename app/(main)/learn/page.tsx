import { redirect } from "next/navigation"

import { StickyWrapper } from "@/components/ui/sticky-wrapper"
import { FeedWrapper } from "@/components/ui/feed-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/ui/user-progress"
import { getUnits, getUserProgress } from "@/db/queries"

const Learn = async () => {

  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [
    userProgress,
    units,
  ] = await Promise.all([
    userProgressData,
    unitsData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    // todo: try and remove flex-row-reverse and move feed-wrapper ontop of stickyWrapper for the same functionality but more clean code
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />

      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)}
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default Learn