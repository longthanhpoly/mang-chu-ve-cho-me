// Teacher allowlist
// Add teacher emails here to grant teacher role
export const teacherEmails = [
  'nhatlinhtl@gmail.com',
  'teacher@example.com',
  'admin@example.com'
  // Add more teacher emails as needed
];

export const isTeacher = (email) => {
  if (!email) return false;
  return teacherEmails.includes(email.toLowerCase());
};
