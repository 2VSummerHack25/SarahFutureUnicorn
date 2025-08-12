"use client";
import styles from "./page.module.css";
import { Button } from "antd";
import Link from "next/link";
import React, { useState } from 'react';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
    return (
        <div className={styles.pageContent}>
            <h1 className={styles.title}>Login</h1>
            <h4 className={styles.subTitle}>Enter your information to continue.</h4>
            <div className={styles.formContainer}> 
                <form className={styles.form}>
                    <div className={styles.inputLabelContainer}>
                        <h4>Email Address</h4>
                    </div>
                    <input 
                        className={styles.input}
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className={styles.inputLabelContainer}>
                        <h4>Password</h4>
                    </div>
                    <input 
                    className={styles.input}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        required
                    />
                </form>
                <Button color="grey" variant= "solid" type="primary" className={styles.submitButton} >Login</Button>
                    <Link href='/' className={styles.forgotPassword}>Forgot Password?</Link>
                    <div className={styles.signUpContainer}>
                        <h4 className={styles.signUpTitle}>{ "New to Lunexa?" }</h4> 
                        <Link href='/' className={styles.createAccount}> Sign up</Link>
                    </div>
            </div>
            </div> )
}