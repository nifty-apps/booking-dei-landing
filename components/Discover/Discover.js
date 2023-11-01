import React, { useEffect, useState, } from 'react';

const Discover = () => {
    const [text, setText] = useState("We know that selecting the right solution is crucial for your hotel, and we're here to make it effortless. With our all-in-one, user-friendly solution, you can effortlessly streamline your hotel operations. From managing room bookings and tracking financial transactions to staying ahead with real-time room status updates, you'll optimize decision-making and elevate your guests' experience with ease. Join us for a free demonstration, and see how Booking Dei can simplify your hotel operations, leaving a positive impact every step of the way!");
    const [texttwo, setTexttwo] = useState("Discover The Ease Of Booking Dei!");
    const [textthree, setTextthree] = useState("CONNECT WITH US");

    useEffect(() => {
        console.log('running')
        const currentPath = window.location.pathname;

        if (currentPath === '/en') {
            setText("We know that selecting the right solution is crucial for your hotel, and we're here to make it effortless. With our all-in-one, user-friendly solution, you can effortlessly streamline your hotel operations. From managing room bookings and tracking financial transactions to staying ahead with real-time room status updates, you'll optimize decision-making and elevate your guests' experience with ease. Join us for a free demonstration, and see how Booking Dei can simplify your hotel operations, leaving a positive impact every step of the way!");
            setTexttwo("Discover The Ease Of Booking Dei!");
            setTextthree("CONNECT WITH US")
        } else if (currentPath === '/de/') {
            setText('আমরা জানি যে সঠিক সমাধান নির্বাচন করা আপনার হোটেলের জন্য অত্যন্ত গুরুত্বপূর্ণ, এবং আমরা এটিকে অনায়াসে করতে এখানে আছি। আমাদের সর্বজনীন, ব্যবহারকারী-বান্ধব সমাধানের মাধ্যমে, আপনি অনায়াসে আপনার হোটেল অপারেশনগুলিকে স্ট্রিমলাইন করতে পারেন। রুম বুকিং পরিচালনা এবং আর্থিক লেনদেন ট্র্যাক করা থেকে শুরু করে রিয়েল-টাইম রুম স্ট্যাটাস আপডেটের সাথে এগিয়ে থাকা পর্যন্ত, আপনি সিদ্ধান্ত গ্রহণকে অপ্টিমাইজ করবেন এবং সহজেই আপনার অতিথিদের অভিজ্ঞতা উন্নত করবেন। একটি বিনামূল্যে প্রদর্শনের জন্য আমাদের সাথে যোগ দিন, এবং দেখুন কিভাবে বুকিং Dei আপনার হোটেলের কার্যক্রমকে সহজ করতে পারে, প্রতিটি ধাপে একটি ইতিবাচক প্রভাব ফেলে!');
            setTexttwo("বুকিং কে সহজে উপলব্ধি করুন!");
            setTextthree("যোগাযোগ করুন")
        } else {
            setText("We know that selecting the right solution is crucial for your hotel, and we're here to make it effortless. With our all-in-one, user-friendly solution, you can effortlessly streamline your hotel operations. From managing room bookings and tracking financial transactions to staying ahead with real-time room status updates, you'll optimize decision-making and elevate your guests' experience with ease. Join us for a free demonstration, and see how Booking Dei can simplify your hotel operations, leaving a positive impact every step of the way!");
            setTexttwo("Discover The Ease Of Booking Dei!");
            setTextthree("CONNECT WITH US");
        }
    });
    return (
        <div className='DiscoverBox'>
            <h3 className='discoverh3'>{texttwo}</h3>
            <div className="blueBox"></div>
            <h6 className='discoverPara'>
                {text}
            </h6>
            <div className="buttonDiv">
                <button className='connectButton'>{textthree}</button>
            </div>
        </div>
    )
}

export default Discover