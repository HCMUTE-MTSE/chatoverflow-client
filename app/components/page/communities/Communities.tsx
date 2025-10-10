import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from '../../ui/Communities/SearchBar';
import SortDropdown from '../../ui/Communities/SortDropdown';
import UserGrid from '../../ui/Communities/UserGrid';
import Loading from '../../ui/Communities/LoadingBar';
import { getUsers } from '../../../services/api/user/user.service';
import type { User as UserType } from '../../../models/constant/GetUser.dto';

const defaultSortOptions = [
  { label: 'Most Question', value: 'mostQuestions' },
  { label: 'Most Answer', value: 'mostAnswers' },
  { label: 'Recently Active', value: 'recentlyActive' },
];

const HEADER_HEIGHT = 120;

const CommunitiesLayout: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('mostQuestions');
  const [users, setUsers] = useState<UserType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchUsers = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const pageToFetch = reset ? 1 : pageRef.current;
        const res = await getUsers(pageToFetch, sort, search);

        setUsers((prev) => {
          const allUsers = reset ? res.data : [...prev, ...res.data];
          const uniqueMap = new Map<string, UserType>();
          allUsers.forEach((u) => uniqueMap.set(u.id, u));
          return Array.from(uniqueMap.values());
        });

        setHasMore(Boolean(res.nextUrl));
        pageRef.current = reset ? 2 : pageRef.current + 1;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [search, sort, loading]
  );

  useEffect(() => {
    pageRef.current = 1;
    setUsers([]);
    setHasMore(true);
    fetchUsers(true);
  }, [search, sort]);

  // infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasMore &&
        !loading
      ) {
        fetchUsers();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [fetchUsers, hasMore, loading]);

  const handleUserClick = (userId: string) => {
    alert(`User ID: ${userId}`);
  };

  return (
    <div
      ref={containerRef}
      className="bg-black px-4 md:px-10 py-8 overflow-y-auto"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <h1 className="text-2xl font-bold text-white mb-8">All Users</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <SearchBar search={search} onChange={setSearch} />
        <SortDropdown
          sort={sort}
          onChange={setSort}
          options={defaultSortOptions}
        />
      </div>

      <UserGrid users={users} />
      {loading && <Loading />}
    </div>
  );
};

export default CommunitiesLayout;
