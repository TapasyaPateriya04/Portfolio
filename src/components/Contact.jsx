import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  CopyIcon,
  PaperPlaneTiltIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "../data/content.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

// EmailJS ids from the previous site; the template expects these field names.
const EMAILJS = {
  service: "service_ocdx6i8",
  template: "template_35pgk1f",
  publicKey: "3X2EASVaMCSQ39BJE",
};

const EMPTY = { from_name: "", from_email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (!v.from_name.trim()) e.from_name = "Please add your name.";
  if (!v.from_email.trim()) e.from_email = "Please add your email so I can reply.";
  else if (!EMAIL_RE.test(v.from_email.trim())) e.from_email = "That email doesn't look right.";
  if (v.message.trim().length < 10) e.message = "A few more words, please (10 characters or more).";
  else if (v.message.length > 3000) e.message = "Please keep it under 3,000 characters.";
  return e;
}

function Field({ id, label, hint, error, textarea, ...props }) {
  const Tag = textarea ? "textarea" : "input";
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-[15px] text-zinc-900 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:ring-4 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-600 ${
          error
            ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/15"
            : "border-zinc-300 focus:border-accent focus:ring-accent/15 dark:border-zinc-800"
        } ${textarea ? "min-h-[9rem] resize-y" : ""}`}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-zinc-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <WarningCircleIcon size={14} weight="bold" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const errors = validate(values);
  const shown = (k) => (touched[k] ? errors[k] : undefined);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (status === "error" || status === "sent") setStatus("idle");
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.elements.company?.value) return; // honeypot
    setTouched({ from_name: true, from_email: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      const first = Object.keys(EMPTY).find((k) => errors[k]);
      document.getElementById(first)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: values.from_name.trim(),
          from_email: values.from_email.trim(),
          subject: values.subject.trim() || "Message from your portfolio",
          message: values.message.trim(),
        },
        { publicKey: EMAILJS.publicKey }
      );
      setStatus("sent");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const sending = status === "sending";

  return (
    <Section
      id="contact"
      index="05"
      eyebrow="Contact"
      title="Let's talk."
      intro="Hiring for a Java, React or full-stack role, or want to ask about something here? Send a message or email me directly."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <Reveal className="space-y-8">
          <div>
            <p className="eyebrow mb-3">Email</p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="link-underline break-all text-lg font-medium text-zinc-900 dark:text-zinc-100"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-300 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {copied ? <CheckIcon size={12} weight="bold" aria-hidden="true" /> : <CopyIcon size={12} aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                >
                  <FaLinkedin size={16} aria-hidden="true" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                >
                  <FaGithub size={16} aria-hidden="true" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                >
                  <ArrowUpRightIcon size={16} aria-hidden="true" /> Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <form noValidate onSubmit={onSubmit} className="surface relative grid gap-5 p-5 sm:p-7" aria-describedby="form-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="from_name"
                label="Name"
                autoComplete="name"
                value={values.from_name}
                onChange={onChange}
                onBlur={onBlur}
                error={shown("from_name")}
                required
              />
              <Field
                id="from_email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.from_email}
                onChange={onChange}
                onBlur={onBlur}
                error={shown("from_email")}
                required
              />
            </div>
            <Field
              id="subject"
              label="Subject"
              hint="Optional."
              value={values.subject}
              onChange={onChange}
              onBlur={onBlur}
              maxLength={140}
            />
            <Field
              id="message"
              label="Message"
              textarea
              rows={5}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              error={shown("message")}
              required
            />
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div id="form-status" aria-live="polite" className="min-h-[1.25rem] text-sm">
                <AnimatePresence mode="wait">
                  {status === "sent" && (
                    <motion.p
                      key="sent"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-accent"
                    >
                      <CheckCircleIcon size={16} weight="bold" aria-hidden="true" />
                      Thanks, your message is on its way. I&apos;ll reply by email.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400"
                    >
                      <WarningCircleIcon size={16} weight="bold" className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        That didn&apos;t send. Try again, or email{" "}
                        <a className="underline" href={`mailto:${profile.email}`}>
                          {profile.email}
                        </a>
                        .
                      </span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <button type="submit" disabled={sending} className="btn-primary shrink-0 disabled:cursor-wait disabled:opacity-70">
                {sending ? (
                  <>
                    <CircleNotchIcon size={16} weight="bold" className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <PaperPlaneTiltIcon size={16} weight="bold" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
