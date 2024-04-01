import { redirect } from "next/navigation"

import { StickyWrapper } from "@/components/ui/sticky-wrapper"
import { FeedWrapper } from "@/components/ui/feed-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/ui/user-progress"
import { getUserProgress } from "@/db/queries"

const Learn = async () => {

  const userProgressData = getUserProgress();

  const [
    userProgress
  ] = await Promise.all([
    userProgressData
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
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
      </FeedWrapper>
    </div>
  )
}

export default Learn