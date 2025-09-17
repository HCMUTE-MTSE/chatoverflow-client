import React, { useState } from 'react';
import TagCard from '~/components/ui/TagCard';
import Select from '~/components/ui/Select/Select';
import Input from '~/components/ui/Input/Input';

interface Tag {
  id: string;
  name: string;
  description: string;
  questionCount: number;
}

// Mock data dựa trên thiết kế Figma
const mockTags: Tag[] = [
  {
    id: '1',
    name: 'javascript',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '2',
    name: 'python',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '3',
    name: 'java',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '4',
    name: 'C#',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '5',
    name: 'PHP',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '6',
    name: 'android',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '7',
    name: 'HTML',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '8',
    name: 'jquery',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '9',
    name: 'C++',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '10',
    name: 'CSS',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '11',
    name: 'iOS',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
  {
    id: '12',
    name: 'SQL',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS',
    questionCount: 23493,
  },
];

const filterOptions = [
  { value: 'most-popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Name' },
];

export default function Tags() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('most-popular');
  const [tags] = useState<Tag[]>(mockTags);

  // Filter tags based on search term
  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - giống Figma */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-64 w-160 h-230 bg-indigo-900/50 rounded-full blur-[357px]"></div>
        <div className="absolute -bottom-28 -right-36 w-138 h-110 bg-indigo-900/50 rounded-full blur-[357px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-0 px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-white text-3xl font-bold mb-16 tracking-tight">
            Tags
          </h1>

          {/* Search and Filter Row */}
          <div className="flex items-center gap-8 mb-16">
            {/* Search Input - sử dụng Input component */}
            <div className="flex-1 max-w-2xl">
              <Input
                label=""
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                placeholder="Search by tag name..."
                className="max-w-2xl"
              />
            </div>

            {/* Filter Dropdown - sử dụng Select component */}
            <div>
              <Select
                label=""
                value={selectedFilter}
                onChange={(value) => setSelectedFilter(value)}
                options={filterOptions}
                placeholder="Most Popular"
              />
            </div>
          </div>
        </div>

        {/* Tags Grid - spacing giống Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTags.map((tag) => (
            <TagCard
              key={tag.id}
              name={tag.name}
              description={tag.description}
              questionCount={tag.questionCount}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredTags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No tags found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
