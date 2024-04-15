import React, { useEffect, useState } from 'react'

const AccountVisit = () => {
    const [count, setCount] = useState(0);

    useEffect(()=>{
        const storedCount = localStorage.getItem("pageVisits");
        const initialCount = Number(storedCount) || 0;
        setCount(initialCount);
        localStorage.setItem("pageVisits", initialCount)
    })
    
  return (
    <div>ive visited {count} times</div>
  )
}

export default AccountVisit